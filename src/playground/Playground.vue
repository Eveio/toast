<template>
  <main id="playground">
    <h1>eve toast</h1>

    <section>
      <form @submit.prevent="toast">
        <h2>Queue a toast!</h2>
        <label>
          title
          <input v-model="form.title" />
        </label>
        <label>
          description
          <input v-model="form.description" />
        </label>
        <fieldset>
          <legend>type</legend>
          <input type="radio" id="type-success" value="success" v-model="form.type">
          <label for="type-success">success</label>
          <input type="radio" id="type-warning" value="warning" v-model="form.type">
          <label for="type-warning">warning</label>
          <input type="radio" id="type-error" value="error" v-model="form.type">
          <label for="type-error">error</label>
        </fieldset>
        <fieldset>
          <legend>position</legend>
          <input type="radio" id="position-center" value="center" v-model="form.position">
          <label for="position-center">center</label>
          <input type="radio" id="position-right" value="right" v-model="form.position">
          <label for="position-right">right</label>
        </fieldset>
        <label>
          duration
          <input v-model="form.duration" type="number" step="500" min="0" />
        </label>
        <button type="submit">Queue!</button>
      </form>
    </section>

    <section>
      <div class="logs">
        <h3>logs</h3>
        <p v-for="(log, index) in logs" :key="index">{{ log }}</p>
      </div>
    </section>

    <EveToastQueue />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { EveToastQueue, queueToast, EveToast } from '@/main'

export default Vue.extend({
  name: 'Playground',

  components: {
    EveToastQueue
  },

  data: () => ({
    form: {
      title: 'Toast?',
      description: 'Yeah!',
      type: 'success' as EveToast['type'],
      position: 'right' as EveToast['position'],
      duration: '3000'
    },
    logs: [] as string[]
  }),

  methods: {
    toast (): void {
      queueToast({
        ...this.form,
        duration: Number(this.form.duration),
        onOpen: this.onToastOpen,
        onClose: this.onToastClose
      })
    },

    onToastOpen (toast: EveToast): void {
      this.logs.push(`toast ${toast.id} opened.`)
    },

    onToastClose (toast: EveToast): void {
      this.logs.push(`toast ${toast.id} closed.`)
    }
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #373737;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;

  legend {
    margin-bottom: 0.5em;
    font-weight: 500;
  }
}

input {
  padding: 0.25em 0.5em;
  font-family: inherit;
  font-size: inherit;
  outline: none;
}

button {
  font-family: inherit;
  font-size: inherit;
}

h1 {
  text-align: center;
  width: 100%;
}

#playground {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

section {
  padding: 3em 1em;
}

@mixin card {
  width: 360px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 0 17px rgba(20, 20, 20, 0.15);
  border-radius: 8px;
}

form {
  @include card;

  > label, fieldset > legend, > button {
    text-transform: capitalize;
  }

  > * {
    margin-top: 1.5em;
  }

  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
  }

  button {
    width: 45%;
    height: 2.5em;
    align-self: center;
    margin-top: 2.5em;
  }
}

.logs {
  @include card;

  height: 100%;

  p {
    margin: 0.25em 0;
    font-size: 15px;
  }
}
</style>
