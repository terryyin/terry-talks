<template>
  <div class="slidev-layout tps-cover">
    <img class="cover-art" src="/cover-crane-released.png" alt="" />
    <div class="cover-wash" aria-hidden="true" />
    <div class="cover-copy">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tps-cover {
  padding: 0;
  overflow: hidden;
  color: #292723;
}

.cover-art,
.cover-wash {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cover-art {
  object-fit: cover;
}

.cover-wash {
  background: linear-gradient(90deg, #ece6dc 0%, #ece6dcf2 35%, #ece6dc00 62%);
}

.cover-copy {
  position: relative;
  height: 100%;
  width: 51%;
  padding: 60px 0 40px 56px;
  text-align: left;
}

:deep(.cover-heading h1) {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 58px;
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

:deep(.cover-and) {
  font-size: 0.62em;
  font-style: italic;
  color: #746a5d;
}

:deep(.cover-japanese-title) {
  margin: 15px 0 0;
  color: #5c564e;
  font-size: 21px;
  letter-spacing: 0.06em;
}

:deep(.cover-subtitle) {
  margin-top: 30px;
  padding-left: 16px;
  border-left: 2px solid #b33a2b;
}

:deep(.cover-subtitle p) {
  margin: 0;
  font-size: 18px;
  line-height: 1.45;
}

:deep(.cover-subtitle .cover-japanese-subtitle) {
  margin-top: 10px;
  color: #5c564e;
  font-size: 13px;
  line-height: 1.5;
}

:deep(.cover-footer) {
  position: absolute;
  left: 56px;
  bottom: 40px;
}

:deep(.cover-speaker) {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

:deep(.cover-speaker span) {
  color: #5c564e;
  font-weight: 400;
}

:deep(.cover-event) {
  margin: 6px 0 0;
  color: #5c564e;
  font-size: 12px;
  letter-spacing: 0.04em;
}
</style>
