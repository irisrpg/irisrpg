<style>
    .grid {
        max-width: 175px;
        background: #222;
        margin: 0 auto;
        padding: 1em 0;
        border-radius: 3px;
    }

    .grid .server {
        display: block;
        max-width: 68%;
        height: 20px;
        background: rgba(255,255,255,.15);
        box-shadow: 0 0 0 1px black inset;
        margin: 10px 0 20px 30px;
    }

    .grid .server:before {
        content: "";
        position: relative;
        top: 7px;
        left: -18px;
        display: block;
        width: 6px;
        height: 6px;
        background: green;
        border: 1px solid black;
        border-radius: 6px;
        margin-top: 7px;
    }
    
    @-webkit-keyframes pulse {
        0% {background: rgba(255,255,255,.15);}
        100% {background: #ae1508;}
    }

    .grid .server:nth-child(3):before {
        background: rgba(255,255,255,.15);
        -webkit-animation: pulse .5s infinite alternate;
    }

    @-webkit-keyframes pulse_three {
        0% {background: rgba(255,255,255,.15);}
        100% {background: #ff8400;}
    }

    .grid .server:nth-child(5):before {
        background: rgba(255,255,255,.15);
        -webkit-animation: pulse_three .7s infinite alternate;
    }

    @-webkit-keyframes pulse_two {
        0% {background: rgba(255,255,255,.15);}
        100% {background: #18a506;}
    }
    .grid .server:nth-child(1):before {
        background: rgba(255,255,255,.15);
        -webkit-animation: pulse_two .1s infinite alternate;
    }
    .grid .server:nth-child(2):before {
        background: rgba(255,255,255,.15);
        -webkit-animation: pulse_two .175s infinite alternate;
    }
    .grid .server:nth-child(4):before {
        background: rgba(255,255,255,.15);
        -webkit-animation: pulse_two .1s infinite alternate;
    }
</style>

<template>
    <div class="animated fadeIn">
        <b-row class="justify-content-center">
            <b-col md="6" class="text-center">
                <div class="grid">
                    <span class="server"></span>
                    <span class="server"></span>
                    <span class="server"></span>
                    <span class="server"></span>
                    <span class="server"></span>
                </div>
                <h1>Em Desenvolvimento!</h1>
                <p class="text-muted">Esta página encontra-se em desenvolvimento. Por favor tente novamente na próxima atualuzação!</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'EXAMPLE'
}
</script>