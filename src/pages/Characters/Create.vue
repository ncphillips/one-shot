<template>
  <main>
    <h1>Create Character</h1>
    <form>
      <g-input-field label="Name" v-model="form.name"/>
      <g-input-field label="Player" v-model="form.player"/>
      <fieldset>
        <legend>Basic Attributes</legend>

        <div>
          [{{ form.strength.cost }} ]
          <g-input-field label="ST" :modelValue="form.strength.score" />
        </div>
        <g-input-field label="DX" v-model="form.dexterity.score"/>
        <g-input-field label="IQ" v-model="form.intelligence.score"/>
        <g-input-field label="HT" v-model="form.health"/>
      </fieldset>
    </form>
  </main>
</template>
<script lang="ts" setup>
import GInputField from "../../components/g-input-field.vue";
import {createCharacter} from "../../gurps/character.ts";
import {reactive} from "vue";

const form = reactive(createCharacter())


// @ts-ignore
window.c = form
</script>