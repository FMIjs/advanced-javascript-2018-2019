import { apiURL } from '../../constants';
import { fetchData } from '../../utils';

export function fetchUsers() {
  return fetchData(`${apiURL}/users`);
}

export function fetchUser(id) {
  return fetchData(`${apiURL}/users/${id}`);
}
