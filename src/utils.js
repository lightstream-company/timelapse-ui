export function decimal(n){
  return parseFloat('0.' + n.toString().split('.')[1]);
}
