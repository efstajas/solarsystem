export type Note = string;

export enum OptionsType {
  DROPDOWN = 'DROPDOWN',
}

export type ConfiguratorConfiguration = {
  type: OptionsType.DROPDOWN;
  title: string;
  id: string;
  options: {
    id: string;
    label: string;
    default: boolean;
  }[];
}[];

export type ConfigurationResult = {
  type: OptionsType.DROPDOWN;
  id: string;
  value: string;
}[];

export default interface Destination {
  initialized: boolean;
  options?: ConfiguratorConfiguration;
  configure?: (configuration: ConfigurationResult) => void;
  destroy?: () => Promise<void>;
  playNote: (note: Note) => void;
// eslint-disable-next-line semi
}
