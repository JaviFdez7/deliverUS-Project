import { get } from './helpers/ApiRequestsHelper'

function getPopular () {
  return get('products/popular')
}

export { getPopular }
