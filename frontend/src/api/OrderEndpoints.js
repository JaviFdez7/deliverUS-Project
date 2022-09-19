import { get, post } from './helpers/ApiRequestsHelper'
function getAll () {
  return get('orders')
}

function getDetailOrder (id) {
  return get(`orders/${id}`)
}

function create (data) {
  return post('orders', data)
}

export { getAll, getDetailOrder, create }
