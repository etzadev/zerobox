import axios from 'axios';
import { createHmac, randomUUID } from 'node:crypto';

const imagekitApiEndpoint =
  process.env.IMAGEKIT_API_ENDPOINT || 'https://api.imagekit.io/v1/files';

const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Basic ${Buffer.from(`${process.env.IMAGEKIT_API_KEY}:`).toString('base64')}`,
});

const getUploadAuth = () => {
  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = createHmac('sha1', process.env.IMAGEKIT_API_KEY)
    .update(`${token}${expire}`)
    .digest('hex');

  return {
    expire,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    signature,
    token,
  };
};

export default async ({ req, res, error }) => {
  try {
    if (req.path === '/auth') return res.json(getUploadAuth());

    const { method, data } = JSON.parse(req.body || '{}');
    const action =
      method ||
      {
        '/files': 'LIST_FILES',
        '/files/delete': 'DELETE_FILE',
        '/files/rename': 'RENAME_FILE',
        '/folders': req.method === 'GET' ? 'LIST_FOLDERS' : 'CREATE_FOLDER',
      }[req.path];

    if (action === 'CREATE_FOLDER') {
      const response = await axios.post(
        'https://api.imagekit.io/v1/folder',
        data,
        {
          headers: {
            ...getHeaders(),
            'Content-Type': 'application/json',
          },
        },
      );

      return res.json({ ok: true, data: response.data });
    }

    if (action === 'RENAME_FILE') {
      const response = await axios.put(`${imagekitApiEndpoint}/rename`, data, {
        headers: {
          ...getHeaders(),
          'Content-Type': 'application/json',
        },
      });

      return res.json({ ok: true, data: response.data });
    }

    if (action === 'DELETE_FILE') {
      const response = await axios.delete(`${imagekitApiEndpoint}/${data.fileId}`, {
        headers: getHeaders(),
      });

      return res.json({ ok: true, data: response.data });
    }

    if (action === 'LIST_FILES' || action === 'LIST_FOLDERS') {
      const response = await axios.get(imagekitApiEndpoint, {
        headers: getHeaders(),
        params: data,
      });

      return res.json({ ok: true, data: response.data });
    }

    return res.json({ ok: false, error: 'Método no soportado' }, 400);
  } catch (err) {
    error(err);

    return res.json(
      {
        ok: false,
        error: err.response?.data?.message || err.message || 'Error en ImageKit',
      },
      err.response?.status || 500,
    );
  }
};
