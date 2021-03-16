class Food{
    constructor(){
        this.image = loadImage('images/Milk.png');
    }
    getFoodStock(){
        database.ref('Food').on('value', (data)=>{
           foodStock = data.val();
            //console.log(foodStock);
        })
        return foodStock;
    }
    updateFoodStock(stock){
        database.ref('/').update({
            Food: stock
        });
    }
    deductFoodStock(){
        database.ref('/').update({
            Food: foodStock-1
        });
    }
    display(){
        for(var i=0; i<foodStock; i++){
            var posX = 100+ i*50;
            image(this.image, posX, 230, 40, 40);
        }
             
    }
}