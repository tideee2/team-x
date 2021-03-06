function LRU(){
    this.list = [];
    this.limit = 5;
    this.size = 0;
    this.set = function(value){
        
        if (this.list.length == 0){
            this.list.push({val: value, freq:1});
        }
        else{
            var temp = this.list[this.list.findIndex(function(x){
                return x.val == value;
            })];
            if (temp == undefined){
                if (this.list.length >= this.limit){
                    this.list.shift();
                    this.list.push({val: value, freq: 1});
                }
                else{
                    this.list.push({val: value, freq:1});
                }
            }
            else{
                temp.freq++;
            }
            this.list.sort(function(a,b){
            return (a.freq > b.freq) ? 1 : (a.freq < b.freq) ? -1 : 0;
        })
        }
        
    };
    this.get = function(value){
        var temp = this.list[this.list.findIndex(function(x){
            return x.val == value;
        })];
        if (temp == undefined){
            console.log('error');
        }
        else{
            temp.freq++;
        }
        this.list.sort(function(a,b){
            return (a.freq > b.freq) ? 1 : (a.freq < b.freq) ? -1 : 0;
        })
    }
    this.printList = function(){
        let s='';
        for(let i = 0; i < this.list.length; i++){
            s+=this.list[i].val+':'+this.list[i].freq+'\n';
        }
        console.log(s+'---\n');

    }
    this.find = function(value){
        console.log(this.list[this.list.findIndex(function(x){
            return x.val == value;
        })]);
    }
}

x = new LRU();
x.set(10);
x.set(20);
x.set(15);
x.set(25);
x.set(5);
x.printList();
x.get(20);
x.get(20);
x.get(20);
x.get(20);
x.get(10);
x.printList();
x.set(100);
x.printList();