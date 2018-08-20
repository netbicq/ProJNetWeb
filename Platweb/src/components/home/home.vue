<template>
	<div class="main">
		<topBar></topBar>
		<div class="content">
			<sideBar></sideBar>
			<div v-bind:class="{'left_conten': $store.state.isCollapse, 'left_conten1': !$store.state.isCollapse}">
				<div class="way_conten">
					<router-view/>
				</div>
				<footBar></footBar>
			</div>
		</div>
	</div>
</template>

<script>
import store from "@/vuex/store";
import topBar from "./topbar";
import sideBar from "./sidebar1";
import footBar from "./footbar";
export default {
  name: "home",
  components: {
    topBar,
    sideBar,
    footBar
  },
  store,
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.left_conten {
  margin-left: 220px;
  padding-top: 60px;
  transition: all 0.2s ease;
}
.left_conten1 {
  margin-left: 70px;
  padding-top: 60px;
  transition: all 0.2s ease;
}
.way_conten {
  padding: 20px;
  padding-bottom: 60px;
}
</style>