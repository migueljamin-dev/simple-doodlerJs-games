document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeft = 50
    let startPoint = 150
    let doodlerBottom = startPoint
    let isGameOver = false
    let platFormCount = 5
    let platform = []
    let upTimerId 
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId 
    let rightTimerId
    let score  = 0

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

                if(form.bottom < 10){
                    let firstPlatForm = platform[0].visual
                    firstPlatForm.classList.remove('platform')
                    platform.shift()
                    score++
                    let newPlatForm =  new PlatForm(600)
                    platform.push(newPlatForm)
                }
            })
        }
    }

    function jump(){
        clearInterval(downTimerId)
        isJumping =true
        upTimerId = setInterval(function(){
            doodlerBottom += 20
         doodler.style.bottom = doodlerBottom + 'px'
            if(doodlerBottom > startPoint + 200){
                fall()
            }
        },30)
    }

    function fall(){
        clearInterval(upTimerId)
        isJumping = false
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
                    startPoint = doodlerBottom
                    jump()
                }
            })
        },30)
    }

    function gameOver(){
        console.log('gameOver')
        isGameOver = true
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function controls(e){
        if(e.key === 'ArrowLeft'){
            //move left
            jumpLeft()
        }else if (e.key === 'ArrowRight'){
            //move right
            jumpRight()
        }else if (e.key === 'ArrowUp'){
            //moveStraight
            moveStraight()
        }
        
    }


    function jumpLeft(){
        if(isGoingRight){
            clearInterval()
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(()=>{
            
            if(doodlerLeft >= 0){
            doodlerLeft -= 5
            doodler.style.left = doodlerLeft + 'px'
            }

            else jumpRight()
        },30)
    }
    function jumpRight(){
        if(isGoingLeft){
            clearInterval()
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(() => {
            if(doodlerLeft <= 340){
                doodlerLeft += 5
                doodler.style.left = doodlerLeft + 'px'
            }
            else jumpLeft()
        },30)
    }
    function moveStraight(){
        isGoingLeft = false
        isGoingRight = false
            clearInterval(rightTimerId)
            clearInterval(leftTimerId)
    }

    function start(){
        if(!isGameOver){
            createPlatform()
            createDoodler()
            setInterval(movePlatform,30) 
           jump()
           document.addEventListener('keyup',controls)
        }
    }
    start()

})
