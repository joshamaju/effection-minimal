<script lang="ts">
  import Star from "lucide-svelte/icons/star";
  import Clock from "lucide-svelte/icons/clock";
  import Users from "lucide-svelte/icons/users";
  import Application from "../components/application.entry.svelte";
  import Header from "../components/header.svelte";
</script>

<Application>
  <div>
    <Header />

    <div class="p-4 lg:container mx-auto">
      <ul class="lg:grid grid-cols-3 gap-4 lg:space-y-0 space-y-4">

      </ul>
    </div>
  </div>
</Application>

<style>
  :global(html, body) {
    height: 100%;
  }
</style>
