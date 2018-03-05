import {entitySentiment} from './entitySentiment';

export interface entity {
  name: string;
  salience: number;
  sentiment: entitySentiment;
}