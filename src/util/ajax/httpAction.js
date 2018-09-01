import { createAjaxAction } from './index';
import {request as ajax} from "./ajax";



const start = {type: 'load', payload: {load: true}}
const end = {type: 'load', payload: {load: false}}
const httpAction = createAjaxAction(ajax, start, end)
export default httpAction;