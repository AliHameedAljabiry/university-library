'use client'
import { IKImage } from 'imagekitio-next'
import config from '@/lib/config'

const UserUniversityCardImage = ({ path }: { path: string }) => (
  <IKImage
    path={path}
    urlEndpoint={config.env.imagekit.urlEndpoint}
    alt='User University Card'
    fill
    className='rounded-sm '
    loading='lazy'
    lqip={{ active: true }}
  />
)

export default UserUniversityCardImage