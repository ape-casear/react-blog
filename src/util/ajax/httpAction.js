import { createAjaxAction } from './index';
import {request as ajax} from "./ajax";



const start = {type: 'LOAD', payload: {load: true}}
const end = {type: 'LOAD', payload: {load: false}}
const httpAction = createAjaxAction(ajax, start, end)
export default httpAction;