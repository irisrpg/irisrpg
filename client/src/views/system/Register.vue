<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1><i class="fa fa-user-plus mr-2"></i> Criar conta</h1>
                <p class="text-muted">Crie sua conta facílmente!</p>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" placeholder="E-mail" v-model="email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Senha" v-model="password" autocomplete="new-password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" class="form-control" placeholder="Repetir a Senha" v-model="password_verify" autocomplete="new-password" />
                </b-input-group>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                    <button @click="handleSubmit" class="btn btn-success btn-block"><i class="fa fa-user-plus mr-2"></i>Criar conta</button>
                </b-col>
                <b-col cols="6">
                    <router-link to="/login" tag="button" class="btn btn-primary btn-block"><i class="fa fa-arrow-left"></i>Já tem uma conta?</router-link>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
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
  name: 'Register',
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_verify: ""
    }
  },
  methods: {
    handleSubmit() {
      if (this.password.length > 0 && this.password == this.password_verify) {
        var vueCMP = this;
        this.$http.post("/registration", {
          payload: {
            email: this.email,
            password: this.password,
            passwordConfirmation: this.password_verify
          }
        }).then(response => {
          vueCMP.$router.push({ name: 'login', query: { registered: true }});
        }).catch(function(error) {
          vueCMP.$bvToast.toast('Um erro ocorreu ao tentar executar ação', {
              title: `Erro!`,
              variant: 'danger',
              solid: true
          });
          console.error(error);
        });
      } else {
        this.$bvToast.toast('Por favor verifique todos os campos', {
            title: `Erro!`,
            variant: 'danger',
            solid: true
        });
      }
    }
  }
}
</script>
