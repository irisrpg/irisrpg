<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1><i class="fa fa-user mr-2"></i>Login</h1>
                  <p class="text-muted">Faça Login Para Continuar</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" class="form-control" placeholder="Username" v-model="email" autocomplete="username email" required autofocus/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" class="form-control" placeholder="Password" v-model="password" autocomplete="current-password" required/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="success" class="px-4" @click="handleSubmit">Login</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-info py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Não tem uma conta?</h2>
                  <p>Entre em um mundo repleto de fantasia! Seja um cavaleiro paladino, um mago ancião, o que você quiser!</p>
                  <router-link to="/register" tag="button" class="btn btn-success mt-3"><i class="fa fa-plus mr-2"></i>Registre-se agora!</router-link>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <div class="fixed-bottom">
      <div style="background: white;width: fit-content;padding-right: 5px;border-top-right-radius: 10px;">
        <span style="margin-right: 5px;">Powered with <i class="fa fa-heart"></i> by</span>
        <a href="https://github.com/irisrpg/irisrpg">
          <img src="img/logo-symbol.png" height="16" style="margin-right: 3px;">
          <span>IrisRPG</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  created: function() {
    if(this.$route.query.registered) {
      this.$bvToast.toast('Conta criada com sucesso! Faça login para começar!', {
        title: `Sucesso!`,
        variant: 'success',
        solid: true
      });
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        var vueCMP = this;
        this.$http.get("https://api.ipify.org/?format=json").then(response => {
          this.$http.post("/auth/login", {
            email: this.email,
            password: this.password,
            ip: response.data.ip
          }).then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('jwt', response.data.token);

            if(localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn');
              if(this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push('dashboard')
              }
            }
          }).catch(function(error) {
            if(error.response.status == 401) {
              vueCMP.$bvToast.toast('Usuário ou senha inválida!', {
                  title: `Erro!`,
                  variant: 'danger',
                  solid: true
              });
            } else {
              vueCMP.$bvToast.toast('Um erro ocorreu ao tentar executar ação', {
                  title: `Erro!`,
                  variant: 'danger',
                  solid: true
              });
              console.error(error);
            }
          });
        });
      }
    }
  }
}
</script>
