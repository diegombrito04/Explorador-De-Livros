export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  buyLink: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface VolumeInfo {
  allowAnonLogging: boolean;
  authors: string[];
  canonicalVolumeLink: string;
  contentVersion: string;
  imageLinks: ImageLinks;
  industryIdentifiers: IndustryIdentifier[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: PanelizationSummary;
  previewLink: string;
  printType: string;
  publishedDate: string;
  readingModes: ReadingModes;
  title: string;
}

export interface Book {
  accessInfo: AccessInfo;
  etag: string;
  id: string;
  kind: string;
  saleInfo: SaleInfo;
  selfLink: string;
  volumeInfo: VolumeInfo;
}
