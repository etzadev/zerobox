import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKIT_API_KEY,
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

const runImageKit = (operation) =>
  new Promise((resolve, reject) => {
    const callback = (error, result) => {
      if (error) reject(error);
      else resolve(result);
    };

    const result = operation(callback);

    if (result?.then) result.then(resolve).catch(reject);
  });

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === 'object') return body;

  return JSON.parse(body);
};

export default async function main(context) {
  const { req, res, error } = context;

  try {
    if (req.path === '/ping') return res.text('pong');

    if (req.path === '/auth') {
      const { token, expire, signature } =
        imagekit.getAuthenticationParameters();

      return res.json(
        {
          expire,
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
          signature,
          token,
        },
        200,
        headers,
      );
    }

    const { method, data = {} } = parseBody(req.body);

    if (method === 'LIST_FILES' || req.path === '/files') {
      const files = await runImageKit((callback) =>
        imagekit.listFiles(
          {
            ...data,
            type: data.type || 'file',
          },
          callback,
        ),
      );

      return res.json({ ok: true, data: files }, 200, headers);
    }

    if (method === 'LIST_FOLDERS') {
      const folders = await runImageKit((callback) =>
        imagekit.listFiles(
          {
            ...data,
            type: 'folder',
          },
          callback,
        ),
      );

      return res.json({ ok: true, data: folders }, 200, headers);
    }

    if (method === 'CREATE_FOLDER') {
      const folder = await runImageKit((callback) =>
        imagekit.createFolder(
          {
            folderName: data.folderName,
            parentFolderPath: data.parentFolderPath,
          },
          callback,
        ),
      );

      return res.json({ ok: true, data: folder }, 200, headers);
    }

    if (method === 'RENAME_FILE' || req.path === '/files/rename') {
      const file = await runImageKit((callback) =>
        imagekit.renameFile(
          {
            filePath: data.filePath,
            newFileName: data.newFileName,
            purgeCache: data.purgeCache ?? true,
          },
          callback,
        ),
      );

      return res.json({ ok: true, data: file }, 200, headers);
    }

    if (method === 'DELETE_FILE' || req.path === '/files/delete') {
      const deletedFile = await runImageKit((callback) =>
        imagekit.deleteFile(data.fileId, callback),
      );

      return res.json({ ok: true, data: deletedFile }, 200, headers);
    }

    return res.json(
      {
        ok: false,
        error: `Ruta o metodo no soportado: ${req.path}`,
      },
      400,
      headers,
    );
  } catch (err) {
    error(err);

    return res.json(
      {
        ok: false,
        error: err.message || 'Error en ImageKit',
      },
      err.statusCode || 500,
      headers,
    );
  }
}
