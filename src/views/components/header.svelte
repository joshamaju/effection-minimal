<script lang="ts">
  import Logout from "lucide-svelte/icons/log-out";
</script>

<header class="border-b border-b-gray-200">
  <div
    class="container mx-auto lg:flex gap-2 lg:space-y-0 space-y-2 items-center justify-between p-4"
  >
    <p class="text-2xl font-bold text-black">AI</p>

    <nav>
      <ul class="flex items-center gap-6">
        <li>
          <a href="/settings/profile">
            <img
              alt="@hunvreus"
              src="https://github.com/hunvreus.png"
              class="size-8 shrink-0 object-cover rounded-full"
            />
          </a>
        </li>

        <li>
          <form action="/logout" method="post">
            <button class="btn-ghost text-red-500">
              <Logout size="{20}" class="inline-block" />
              <span class="align-middle">Sign out</span>
            </button>
          </form>
        </li>
      </ul>
    </nav>
  </div>
</header>
