<script>
  let newTodo = "";
  let todos = [];

  const addTodo = () => {
    todos = [{ id: Date.now(), title: newTodo }, ...todos];
    newTodo = "";
  };

  const removeTodo = (todoId) => {
    todos = todos.filter((t) => t.id !== todoId);
  };
</script>

<h1>Todo List</h1>

<input
  bind:value={newTodo}
  on:keydown={(e) => e.key === "Enter" && addTodo()}
/>
<button on:click={addTodo}>Add todo</button>

<div>
  {#each todos as todo }
    <h1>
      <span>{todo.title}</span>
      <button on:click={() => removeTodo(todo.id)}>Remove</button>
    </h1>
  {/each}
</div>
