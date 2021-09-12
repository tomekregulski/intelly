// import axios from 'axios';
import testData from '../data/data';

import { productData, storeData } from '../dataProcessing/dataProcessing';

export const apiResponse = testData;

export const dataByProduct = productData(testData);

export const dataByStore = storeData(testData);
