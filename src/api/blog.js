import { wrap_ajax } from '../util/ajax'
import { apiUrl } from '../config/base'


const getBlog = wrap_ajax( apiUrl + '/blog/:param')