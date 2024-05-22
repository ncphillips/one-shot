<template>
  <h1>Solo GURPS</h1>
  <RouterLink
    :to="{
      name: 'adventure.scene.show',
      params: { adventureId: 1, sceneId: 1 },
    }"
  >
    Start Adventure
  </RouterLink>
</template>
