<template>
  <div class="sidebar">
    <div class="sidebar-item">
        <router-link active-class="active" to="/home/vue">Vue</router-link>
    </div>
    <div class="sidebar-item">
        <router-link active-class="active" to="/home/javascript">JavaScript</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.sidebar {
    width: 200px;
    background-color: #3e4551;
    color: white;
    padding: 20px;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar a{
    display: block;
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
    background-color: #61dafb;
    text-decoration: none;
    font-size: 16px;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
}

.sidebar a:hover {
    background-color: #4ecdc4;
}

.sidebar .active {
    background-color: #4ecdc4;
}
</style>