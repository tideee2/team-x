function lru(x){
    this.list = {};
    this.limit = 10;
    this.next = null;
    this.prev = null;
}
lru.prototype.el = function(value){
    this.next = null;
    this.value = value;
    this.prev = null;
}