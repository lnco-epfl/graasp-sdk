import { ItemType } from '../../../constants/itemType';
import { Serializable, UnknownExtra } from '../../../interfaces/extra';

export interface ItemSettings extends Serializable {
  isPinned?: boolean;
  showChatbox?: boolean;
  hasThumbnail?: boolean;
  isResizable?: boolean;
  isCollapsible?: boolean;
}

export interface Item<T extends UnknownExtra = UnknownExtra, S = ItemSettings> {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  path: string;
  extra: T;
  settings: S;
  creator: string;
  createdAt: string;
  updatedAt: string;
}
