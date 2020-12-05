<template>
  <div id="app" class="app_main">
    <router-view class="h100"/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {
    },
  }
</script>

<style lang="less">
  .app_main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 100%;
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #fff;
    }
    ::-webkit-scrollbar-thumb {
      border-radius:5px;
      -webkit-box-shadow: inset 0 0 6px #DEDEE0;
      background-color: rgba(0, 0, 0, .1)
    }


    .h100{
      height: 100%;
    }

    /*.back_top_cls{*/
    /*  position: fixed;*/
    /*  background-color: #fff;*/
    /*  width: 40px;*/
    /*  height: 40px;*/
    /*  border-radius: 50%;*/
    /*  color: #409EFF;*/
    /*  display: flex;*/
    /*  align-items: center;*/
    /*  justify-content: center;*/
    /*  font-size: 20px;*/
    /*  box-shadow: 0 0 6px rgba(0,0,0,0.12);*/
    /*  cursor: pointer;*/
    /*  z-index: 5;*/
    /*}*/
  }
</style>
