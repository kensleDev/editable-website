<script>
  import { classNames } from '$lib/core/util';
  export let noPadding = false;
</script>

<div class={classNames('max-w-lg mx-auto', noPadding ? '' : 'px-4')}>
  <slot />
</div>
