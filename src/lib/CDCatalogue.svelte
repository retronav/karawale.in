<!-- Most of this UI is inspired by https://www.strawberrymusicplayer.org/ -->

<script lang="ts">
  import { Disc, ArrowLeft, ExternalLink, Hash, ChevronRight, DiscAlbum } from '@lucide/svelte';
  import { PROJECT_GROUPS } from '$lib/projects';

  let currentLevel = $state('ROOT');
  let selectedGroup: any = $state(null);
  let selectedProject: any = $state(null);

  export function openItem(nameOrId: string) {
    const group = PROJECT_GROUPS.find(g => g.id === nameOrId);
    if (group) {
      selectedGroup = group;
      currentLevel = 'GROUP';
      selectedProject = null;
      return;
    }

    for (const g of PROJECT_GROUPS) {
      const p = g.projects.find((proj: any) => proj.title === nameOrId);
      if (p) {
        selectedGroup = g;
        currentLevel = 'GROUP';
        selectedProject = p;
        return;
      }
    }
  }

  function reset() {
    currentLevel = 'ROOT';
    selectedGroup = null;
    selectedProject = null;
  }
</script>

<div class="catalogue-container">
  <!-- LEFT: LIST VIEW -->
  <div class="list-panel">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <button onclick={reset} class="breadcrumb-btn">ROOT</button>
      {#if selectedGroup}
        <ChevronRight size={12} />
        <button onclick={() => selectedProject = null} class="breadcrumb-btn truncate">
          {selectedGroup.title}
        </button>
      {/if}
    </div>

    <div class="list-content">
      {#if currentLevel === 'ROOT'}
        {#each PROJECT_GROUPS as group (group.id)}
          <button
            onclick={() => { selectedGroup = group; currentLevel = 'GROUP'; }}
            class="folder-btn"
          >
            <span class="folder-title">{group.title}</span>
            <DiscAlbum size={14} class="folder-icon"/>
          </button>
        {/each}
      {:else}
        <button onclick={reset} class="back-btn">
          <ArrowLeft size={10} /> RETURN TO ROOT
        </button>
        {#each selectedGroup.projects as project (project.title)}
          <button
            onclick={() => selectedProject = project}
            class="project-btn"
            class:active={selectedProject?.title === project.title}
          >
            {project.title}

            <span class="year">{project.year}</span>
          </button>
        {/each}
      {/if}
    </div>
  </div>

  <!-- RIGHT: DETAIL VIEW -->
  <div class="detail-panel">
    {#if !selectedProject}
      <div class="empty-state">
        <Disc size={48} />
        <p>SELECT A CD</p>
      </div>
    {:else}
      <div class="detail-content">
        <!-- Header -->
        <div class="detail-header">
          <div class="header-left">
            <h2 class="project-title">{selectedProject.title}</h2>
            <div class="project-meta">
              <span>YEAR: {selectedProject.year}</span>
              <span>STATUS: {selectedProject.status?.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="detail-body">
          <p class="project-description">{selectedProject.description}</p>

          <div class="info-section">
            <h3>TECH</h3>
            <div class="tag-list">
              {#each selectedProject.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="detail-footer">
          {#if selectedProject.url}
             <!-- svelte-ignore a11y_invalid_attribute -->
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noreferrer"
              class="btn-launch"
            >
              <button>
                <ExternalLink size={14} /> LAUNCH
              </button>
            </a>
          {/if}
          {#if selectedProject.source}
             <!-- svelte-ignore a11y_invalid_attribute -->
            <a
              href={selectedProject.source}
              target="_blank"
              rel="noreferrer"
              class="btn-launch"
            >
              <button>
                <Hash size={14} /> SOURCE
              </button>
            </a>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "sass:color";
  @use "$lib/styles/variables" as *;

  .catalogue-container {
    height: 600px;
    background: $background;
    font-family: $font-family-mono;
    color: $golden;
    padding: 1.5rem;
    display: flex;
    gap: 1.5rem;
    border: 1px solid color.adjust($golden, $alpha: -0.8);
  }

  .list-panel {
    width: 33.333%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 1px solid color.adjust($golden, $alpha: -0.8);
    padding-right: 1rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--step--2);
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  .breadcrumb-btn {
    background: none;
    border: none;
    box-shadow: none;
    padding: 0;
    min-height: auto;
    font-size: inherit;

    &:hover {
      background: none;
      box-shadow: none;
      color: $foreground;
    }
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: color.adjust($golden, $alpha: -0.8); }
    &::-webkit-scrollbar-thumb:hover { background: color.adjust($golden, $alpha: -0.5); }
  }

  .folder-btn {
    width: 100%;
    text-align: left;
    font-size: var(--step--1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      :global(.folder-icon) {
        opacity: 1;
      }
    }
  }

  .folder-title {
    font-weight: bold;
  }

  :global(.folder-icon) {
    opacity: 0.5;
  }

  .back-btn {
    width: 100%;
    text-align: left;
    font-size: var(--step--2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.5;
    background: none;
    border: none;
    box-shadow: none;
    padding: 0.5rem;
    min-height: auto;

    &:hover {
      background: none;
      box-shadow: none;
      color: $foreground;
    }
  }

  .project-btn {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    font-size: var(--step--1);
    background: none;
    border: none;
    border-left: 2px solid color.adjust($golden, $alpha: -0.8);
    box-shadow: none;
    min-height: auto;
    color: color.adjust($golden, $alpha: -0.3);
    transition: all 0.2s;

    &:hover {
      background: none;
      box-shadow: none;
      border-left-color: $golden;
      padding-left: 1rem;
      color: $golden;
    }

    &.active {
      border-left-color: $golden;
      background: color.adjust($golden, $alpha: -0.9);
      color: $foreground;
      padding-left: 1rem;
    }

    .year {
      float: right;
      font-size: var(--step--2);
      opacity: 0.6;
    }
  }

  .detail-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
    text-align: center;

    p {
      font-size: var(--step--1);
      margin-top: 1rem;
    }
  }

  .detail-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .detail-header {
    border-bottom: 1px solid color.adjust($golden, $alpha: -0.7);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .project-title {
    font-size: var(--step-2);
    font-weight: bold;
    line-height: 1;
    margin: 0 0 0.5rem 0;
    color: $golden;
  }

  .project-meta {
    font-size: var(--step--2);
    opacity: 0.6;
    display: flex;
    gap: 1rem;
  }

  .detail-body {
    flex: 1;
    overflow-y: auto;
    padding-right: 1rem;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: color.adjust($golden, $alpha: -0.8); }
    &::-webkit-scrollbar-thumb:hover { background: color.adjust($golden, $alpha: -0.5); }
  }

  .project-description {
    font-size: var(--step--1);
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .info-section {
    font-size: var(--step--2);

    h3 {
      font-weight: bold;
      margin-bottom: 0.5rem;
      opacity: 0.5;
      font-size: inherit;
    }
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    border: 1px solid color.adjust($golden, $alpha: -0.6);
    padding: 0.125rem 0.5rem;
  }

  .detail-footer {
    margin-top: auto;
    padding-top: 1.5rem;
    display: flex;
    gap: 1rem;
  }

  .btn-launch {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--step--1);
  }

  @media (max-width: 600px) {
    .catalogue-container {
      flex-direction: column;
      height: auto;
      min-height: 500px;
    }

    .list-panel {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid color.adjust($golden, $alpha: -0.8);
      padding-right: 0;
      padding-bottom: 1rem;
      max-height: 200px;
    }

    .detail-panel {
      min-height: 300px;
    }

    .detail-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .project-meta {
      flex-direction: column;
      gap: 0.25rem;
    }

    .detail-body {
      padding-right: 0;
    }

    .detail-footer {
      flex-direction: column;
    }

    .btn-launch {
      justify-content: center;
      width: 100%;
    }
  }
</style>
