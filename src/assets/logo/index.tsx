interface Props extends React.ComponentProps<'svg'> {
  variant?: 'default' | 'icon';
}

export const Logo: React.FC<Props> = ({ variant = 'default', className }) => {
  if (variant === 'default') {
    return (
      <svg
        width='229'
        height='48'
        viewBox='0 0 229 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <g filter='url(#filter0_iii_3046_38738)'>
          <g clip-path='url(#clip0_3046_38738)'>
            <rect
              width='48'
              height='48'
              rx='12'
              fill='#2E90FA'
            />
            <rect
              width='48'
              height='48'
              fill='url(#paint0_linear_3046_38738)'
            />
            <g filter='url(#filter1_d_3046_38738)'>
              <path
                d='M24 14L12 20.5V32.5L24 39V26.5L24 14Z'
                fill='white'
                fill-opacity='0.7'
              />
              <path
                d='M24 14L36 20.5V32.5L24 39V26.5L24 14Z'
                fill='white'
                fill-opacity='0.55'
              />
              <path
                d='M24 14L12 20.5L24 27L36 20.5L24 14Z'
                fill='white'
                fill-opacity='0.9'
              />
            </g>
          </g>
          <rect
            x='1'
            y='1'
            width='46'
            height='46'
            rx='11'
            stroke='url(#paint3_linear_3046_38738)'
            stroke-width='2'
          />
        </g>
        <path
          d='M60 34V30.5L72.5 17H60V13.67H79.5V17.2L67 30.67H79.5V34H60Z'
          fill='white'
        />
        <path
          d='M83 26.88C83 22.75 85.93 19.47 89.64 19.47C93.29 19.47 96.05 22.46 96.05 26.88C96.05 27.22 96.02 27.59 95.99 27.93H87C87.35 29.59 88.77 30.69 90.54 30.69C91.87 30.69 92.97 30.14 93.58 29.13H95.93C95.06 31.68 92.71 33.29 89.87 33.29C86.04 33.29 83 30.34 83 26.88ZM87.06 25.87H93.93C93.52 24.24 92.13 23.08 89.64 23.08C88.13 23.08 87.35 23.63 87.06 25.87Z'
          fill='white'
        />
        <path
          d='M100 33V19.76H102.09V21.79C102.99 20.31 104.5 19.47 106.34 19.47C107.29 19.47 108.13 19.7 108.8 20.08V22.75C108.16 22.34 107.35 22.08 106.4 22.08C104.53 22.08 102.09 23.3 102.09 26.46V33H100Z'
          fill='white'
        />
        <path
          d='M113 26.88C113 22.75 115.93 19.47 119.64 19.47C123.36 19.47 126.29 22.75 126.29 26.88C126.29 31.01 123.36 34.29 119.64 34.29C115.93 34.29 113 31.01 113 26.88ZM115.09 26.88C115.09 29.82 117.04 31.97 119.64 31.97C122.25 31.97 124.2 29.82 124.2 26.88C124.2 23.94 122.25 21.79 119.64 21.79C117.04 21.79 115.09 23.94 115.09 26.88Z'
          fill='white'
        />
        <path
          d='M130 33V13.67H137.85C141.47 13.67 143.71 15.7 143.71 18.64C143.71 20.64 142.52 22.26 140.6 22.96C142.84 23.57 144.32 25.36 144.32 27.65C144.32 30.99 141.76 33 137.82 33H130ZM132.09 22.11H137.27C139.81 22.11 141.59 20.93 141.59 18.78C141.59 16.75 139.84 15.54 137.53 15.54H132.09V22.11ZM132.09 31.13H137.53C140.54 31.13 142.2 29.64 142.2 27.36C142.2 25.07 140.51 23.61 137.5 23.61H132.09V31.13Z'
          fill='white'
        />
        <path
          d='M149 26.88C149 22.75 151.93 19.47 155.64 19.47C159.36 19.47 162.29 22.75 162.29 26.88C162.29 31.01 159.36 34.29 155.64 34.29C151.93 34.29 149 31.01 149 26.88ZM151.09 26.88C151.09 29.82 153.04 31.97 155.64 31.97C158.25 31.97 160.2 29.82 160.2 26.88C160.2 23.94 158.25 21.79 155.64 21.79C153.04 21.79 151.09 23.94 151.09 26.88Z'
          fill='white'
        />
        <path
          d='M166 33L172 26.38L166.26 19.76H168.74L173.06 24.93L177.38 19.76H179.74L174 26.35L180 33H177.52L173.06 27.68L168.6 33H166Z'
          fill='white'
        />
        <defs>
          <filter
            id='filter0_iii_3046_38738'
            x='0'
            y='-3'
            width='48'
            height='54'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood
              flood-opacity='0'
              result='BackgroundImageFix'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-3' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='shape'
              result='effect1_innerShadow_3046_38738'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='3' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_3046_38738'
              result='effect2_innerShadow_3046_38738'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='erode'
              in='SourceAlpha'
              result='effect3_innerShadow_3046_38738'
            />
            <feOffset />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
            />
            <feBlend
              mode='normal'
              in2='effect2_innerShadow_3046_38738'
              result='effect3_innerShadow_3046_38738'
            />
          </filter>
          <filter
            id='filter1_d_3046_38738'
            x='5.25'
            y='5.25'
            width='37.5'
            height='42'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood
              flood-opacity='0'
              result='BackgroundImageFix'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1.5'
              operator='erode'
              in='SourceAlpha'
              result='effect1_dropShadow_3046_38738'
            />
            <feOffset dy='2.25' />
            <feGaussianBlur stdDeviation='2.25' />
            <feComposite
              in2='hardAlpha'
              operator='out'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_3046_38738'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_3046_38738'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_3046_38738'
            x1='24'
            y1='5.96047e-07'
            x2='26'
            y2='48'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.12'
            />
          </linearGradient>
          <linearGradient
            id='paint1_linear_3046_38738'
            x1='28.875'
            y1='12.75'
            x2='28.875'
            y2='34.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.8'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.5'
            />
          </linearGradient>
          <linearGradient
            id='paint2_linear_3046_38738'
            x1='18.5625'
            y1='18'
            x2='18.5625'
            y2='34.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.8'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.5'
            />
          </linearGradient>
          <linearGradient
            id='paint3_linear_3046_38738'
            x1='24'
            y1='0'
            x2='24'
            y2='48'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.12'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0'
            />
          </linearGradient>
          <clipPath id='clip0_3046_38738'>
            <rect
              width='48'
              height='48'
              rx='12'
              fill='white'
            />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (variant === 'icon') {
    return (
      <svg
        width='48'
        height='48'
        viewBox='0 0 48 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <g filter='url(#filter0_iii_3046_38738)'>
          <g clip-path='url(#clip0_3046_38738)'>
            <rect
              width='48'
              height='48'
              rx='12'
              fill='#2E90FA'
            />
            <rect
              width='48'
              height='48'
              fill='url(#paint0_linear_3046_38738)'
            />
            <g filter='url(#filter1_d_3046_38738)'>
              <path
                d='M24 14L12 20.5V32.5L24 39V26.5L24 14Z'
                fill='white'
                fill-opacity='0.7'
              />
              <path
                d='M24 14L36 20.5V32.5L24 39V26.5L24 14Z'
                fill='white'
                fill-opacity='0.55'
              />
              <path
                d='M24 14L12 20.5L24 27L36 20.5L24 14Z'
                fill='white'
                fill-opacity='0.9'
              />
            </g>
          </g>
          <rect
            x='1'
            y='1'
            width='46'
            height='46'
            rx='11'
            stroke='url(#paint3_linear_3046_38738)'
            stroke-width='2'
          />
        </g>
        <defs>
          <filter
            id='filter0_iii_3046_38738'
            x='0'
            y='-3'
            width='48'
            height='54'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood
              flood-opacity='0'
              result='BackgroundImageFix'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='BackgroundImageFix'
              result='shape'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-3' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='shape'
              result='effect1_innerShadow_3046_38738'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='3' />
            <feGaussianBlur stdDeviation='1.5' />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='effect1_innerShadow_3046_38738'
              result='effect2_innerShadow_3046_38738'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1'
              operator='erode'
              in='SourceAlpha'
              result='effect3_innerShadow_3046_38738'
            />
            <feOffset />
            <feComposite
              in2='hardAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
            />
            <feBlend
              mode='normal'
              in2='effect2_innerShadow_3046_38738'
              result='effect3_innerShadow_3046_38738'
            />
          </filter>
          <filter
            id='filter1_d_3046_38738'
            x='8'
            y='10'
            width='32'
            height='33'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'
          >
            <feFlood
              flood-opacity='0'
              result='BackgroundImageFix'
            />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feMorphology
              radius='1.5'
              operator='erode'
              in='SourceAlpha'
              result='effect1_dropShadow_3046_38738'
            />
            <feOffset dy='2.25' />
            <feGaussianBlur stdDeviation='2.25' />
            <feComposite
              in2='hardAlpha'
              operator='out'
            />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_3046_38738'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_3046_38738'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_3046_38738'
            x1='24'
            y1='5.96047e-07'
            x2='26'
            y2='48'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.12'
            />
          </linearGradient>
          <linearGradient
            id='paint1_linear_3046_38738'
            x1='28.875'
            y1='12.75'
            x2='28.875'
            y2='34.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.8'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.5'
            />
          </linearGradient>
          <linearGradient
            id='paint2_linear_3046_38738'
            x1='18.5625'
            y1='18'
            x2='18.5625'
            y2='34.5'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.8'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0.5'
            />
          </linearGradient>
          <linearGradient
            id='paint3_linear_3046_38738'
            x1='24'
            y1='0'
            x2='24'
            y2='48'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              stop-color='white'
              stop-opacity='0.12'
            />
            <stop
              offset='1'
              stop-color='white'
              stop-opacity='0'
            />
          </linearGradient>
          <clipPath id='clip0_3046_38738'>
            <rect
              width='48'
              height='48'
              rx='12'
              fill='white'
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
};
