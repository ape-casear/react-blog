import { createAjaxAction } from './index';
import {request as ajax} from "./ajax";



const start = {type: 'load', payload: {loading: true}}
const end = {type: 'load', payload: {loading: false}}
const httpAction = createAjaxAction(ajax, start, end)
export default httpAction;