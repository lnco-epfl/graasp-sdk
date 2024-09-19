import { UnionOfConst } from '@/typeUtils.js';

export const ItemType = {
  APP: 'app',
  DOCUMENT: 'document',
  FOLDER: 'folder',
  LINK: 'embeddedLink',
  LOCAL_FILE: 'file',
  S3_FILE: 's3File',
  SHORTCUT: 'shortcut',
} as const;
export type ItemTypeUnion = UnionOfConst<typeof ItemType>;
