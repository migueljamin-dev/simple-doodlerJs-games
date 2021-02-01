document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeft = 50
    let doodlerBottom = 150
    let isGameOver = false
    let platFormCount = 5
    let platform = []
    let upTimerId 
    let downTimerId
    let isJumping = true

    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeft = platform[0].left
        doodler.style.left = doodlerLeft + 'px'
        doodler.style.bottom = doodlerBottom + 'px'
    }

    class PlatForm{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }



    function createPlatform(){
        for(let i=0;i<platFormCount;i++){
            let platGap = 600 / platFormCount  // 600 this is the height of grid then dived by 5
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new PlatForm(newPlatBottom)
            platform.push(newPlatform)
            console.log(platform)
        }

    }

    function movePlatform(){
        if(doodlerBottom > 200){
            platform.forEach(form => {
                form.bottom -=4
                let visual = form.visual
                visual.style.bottom = form.bottom + 'px'
            })
        }
    }

    function jump(){
        clearInterval(downTimerId)
        isJumping =true
        upTimerId = setInterval(function(){
            doodlerBottom += 20
            doodler.style.bottom = doodlerBottom + 'px'
            if(doodlerBottom > 350){
                fall()
            }
        },30)
    }

    function fall(){
        clearInterval(upTimerId)
        isJumping = true
        downTimerId = setInterval(function (){
            doodlerBottom -= 5
            doodler.style.bottom = doodlerBottom + 'px'
            if(doodlerBottom <= 0){
               gameOver()
            }
            platform.forEach(form => {
                if((doodlerBottom >= form.bottom) &&
                    (doodlerBottom <= form.bottom + 15) &&
                    ((doodlerLeft + 60) >= form.left) &&
                    (doodlerLeft <= (form.left + 85)) &&
                    !isJumping
                ){
                    console.log('jumping')
                    jump()
                }
            })
        },30)
    }

    function gameOver(){
        console.log('gameOver')
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function controls(e){
        if(e.key === 'ArrowLeft'){
            //move left
        }else if (e.key === 'ArrowRight'){
            //move right
        }else if (e.key === 'ArrowUp'){
            //moveStraight
        }
        

    }

    function start(){
        if(!isGameOver){
            createPlatform()
            createDoodler()
            setInterval(movePlatform,30) 
           jump()
        }
    }
    start()

})
