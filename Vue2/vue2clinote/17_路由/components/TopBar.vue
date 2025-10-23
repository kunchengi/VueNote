<template>
    <div class="top-bar">
    <nav class="nav-links">
        <ul>
            <li><router-link active-class="active" to="/home">首页</router-link></li>
            <li><router-link active-class="active" to="/about">关于</router-link></li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    name: 'TopBar',
}
</script>

<style>
.top-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #282c34;
    color: white;
    padding: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.nav-links li {
    margin: 0 20px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: #61dafb;
}

.nav-links .active {
    color: #61dafb;
}
</style>