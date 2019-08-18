<template>
  <div>
    <div v-if="$store.state.user">
      Hello {{ $store.state.user.email }}!
    </div>
    <pre>
      I am the secret content, I am shown only when the use is connected.
    </pre>
    <p>
      You can also refresh this page, you'll still be connected!
    </p>
    <a href="/auth/logout">Logout</a>

    <a nuxt-link:="to='/secret'">Logout</a>
    <a nuxt-link:="to='/about'">Logout</a>
  </div>
</template>
