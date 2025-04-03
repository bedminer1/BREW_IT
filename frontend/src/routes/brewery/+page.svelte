<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Form from "$lib/components/ui/form";    
    import * as Tabs from "$lib/components/ui/tabs";
    import { Textarea } from "$lib/components/ui/textarea";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { brewSchema, type BrewSchema } from "./brewSchema.js";

    // BREWING
    // fetch brewing tasks
    // brews will contain task name, description, 
    // steps(ingredients), progress(brewing time),
    // drinks(flavor notes eg espresso for hyped goals)
    let { data, form: messageForm } = $props()
    let { brews, finishedBrews } = $state(data)

    const form = superForm(data.form, {
        validators: zodClient(brewSchema),
    })

    const { form: formData, enhance } = form

    let stepsTextarea = $state("")
    $effect(() => {
        $formData.steps = stepsTextarea.split("\n")
    })

    let openStates = $state(brews.map(() => false))
    function finishBrew(id: number) {
        finishedBrews = [...finishedBrews, brews[id]]
        openStates[id] = false
        brews.splice(id, 1)
        openStates.splice(id, 1)
    }

    // CHATBOT/NEW BREW
    // chatbox ui, text input and chat display
    // sending to gemini, receiving ai response
    // edit task name, description, and steps
    // save and store in db
    let messages: Message[] = $state([
        {
            author: "assistant",
            text: "Hey! Brew something new?",
            timeSent: new Date(),
        }
    ])
    let userMessage: string = $state("")
    let assistantMessage = $derived(messageForm?.reply)

    async function handleSendMessage() {
        const messageToSend = userMessage
        setTimeout(()=>{
            messages = [...messages, 
                {
                    author: "user",
                    text: messageToSend,
                    timeSent: new Date(),
                },
            ]
            userMessage = ""
        }, 10)
        setTimeout(()=>{
            messages = [...messages, 
            {
                    author: "assistant",
                    text: assistantMessage ?? "message not found",
                    timeSent: new Date(),
                },
            ]
        }, 500)
    }
</script>

<!-- USER CURRENTLY BREWING -->
<div class="flex flex-col justify-center mb-10 mt-6">
    <div class="mb-4 flex justify-between">
        <h1 class="text-3xl pl-2">Brewing...</h1>

<!-- NEW BREW -->
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>New Brew</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Add Task</Dialog.Title>
                </Dialog.Header>
                <Tabs.Root value="miko">
                    <Tabs.List class="mb-2">
                        <Tabs.Trigger value="miko">Miko</Tabs.Trigger>
                        <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="miko">
            <!-- CHATBOX -->
            <!-- TODO: add date, add form response -->
                        <form method="post" action="?/sendMessage" onsubmit={handleSendMessage} use:enhance>
                            <div class="h-80 flex flex-col gap-4 overflow-auto mb-4">
                                {#each messages as message}
                                <div class="w-full mb-5 flex pr-5 {message.author === "assistant" ? "justify-start" : "justify-end"}">
                                    <p>{message.text}</p>
                                </div>
                                {/each}
                            </div>
                            <Input bind:value={userMessage}></Input>
                        </form>
                    </Tabs.Content>
                    <Tabs.Content value="manual">
            <!-- TODO: ADD MANUAL FORM -->
                        <div class="h-96 overflow-auto">
                            <form method="POST" action="?/sendNewTask" use:enhance>
                                <Form.Field {form} name="drink" class="mb-4">
                                    <Form.Control let:attrs>
                                        <Form.Label>Drink</Form.Label>
                                        <Input {...attrs} bind:value={$formData.drink} />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>

                                <Form.Field {form} name="task">
                                    <Form.Control let:attrs>
                                        <Form.Label>Task</Form.Label>
                                        <Input {...attrs} bind:value={$formData.task} />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>
                            
                                <Form.Field {form} name="description">
                                    <Form.Control let:attrs>
                                        <Form.Label>Description</Form.Label>
                                        <Input {...attrs} bind:value={$formData.description} />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>

                                <Form.Field {form} name="steps" class="mb-4">
                                    <Form.Control let:attrs>
                                        <Form.Label>Steps</Form.Label>
                                        <Textarea {...attrs} bind:value={stepsTextarea} />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>
                            
                                <Form.Button>Create Brew</Form.Button>
                            </form>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </Dialog.Content>
        </Dialog.Root>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full gap-4">
        {#each brews as brew, id} 
        <Dialog.Root bind:open={openStates[id]}>
            <Dialog.Trigger>
                <Card.Root class="text-left w-full h-52 sm:h-60 overflow-auto">
                    <Card.Header>
                        <Card.Title>{brew.drink}</Card.Title>
                        <Card.Description>{brew.task}</Card.Description>
                        </Card.Header>
                        <Card.Content>
                        <p>{brew.steps[brew.progress-1]}</p>
                        </Card.Content>
                </Card.Root>

            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>{brew.task}</Dialog.Title>
                <Dialog.Description>
                    {brew.drink}
                </Dialog.Description>
                <div class="flex justify-between">
                    <p>Step {brew.progress} out of {brew.steps.length}</p>

                    <div class="flex justify-center gap-3">
                        <Button disabled={brew.progress <= 1} on:click={() => brews[id].progress--} variant="outline">&#10094;</Button>
                        <Button on:click={() => {
                            if (brew.progress === brew.steps.length) {
                                finishBrew(id)
                            } else {
                                brews[id].progress++
                            }
                            }} variant={brew.progress === brew.steps.length ? "default" : "outline"}>&#10095;</Button>
                    </div>
                </div>
                <div class="text-left">
                    {#if brew.progress === 1}
                        <p>{brew.steps[brew.progress-1]}</p>
                        <p class="opacity-55">{brew.steps[brew.progress]}</p>
                        <p class="opacity-55">...</p>
                        <p class="h-12"></p>
                    {:else if brew.progress === 2}
                        <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                        <p>{brew.steps[brew.progress-1]}</p>
                        <p class="opacity-55">{brew.steps[brew.progress]}</p>
                        <p class="opacity-55">...</p>
                        <p class="h-6"></p>
                    {:else if brew.progress === brew.steps.length - 1}
                        <p class="opacity-55">...</p>
                        <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                        <p>{brew.steps[brew.progress-1]}</p>
                        <p class="opacity-55">{brew.steps[brew.progress]}</p>
                        <p class="h-6"></p>
                    {:else if brew.progress === brew.steps.length}
                        <p class="opacity-55">...</p>
                        <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                        <p>{brew.steps[brew.progress-1]}</p>
                        <p class="h-12"></p>
                    {:else}
                        <p class="opacity-55">...</p>
                        <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                        <p>{brew.steps[brew.progress-1]}</p>
                        <p class="opacity-55">{brew.steps[brew.progress]}</p>
                        <p class="opacity-55">...</p>
                    {/if}
                </div>

                <div class="flex gap-5">
                    <Input></Input>
                    <Button>Add Note</Button>
                </div>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
        {/each}
    </div>
</div>

<!-- BREW HISTORY -->
<div class="flex flex-col justify-center">
    <div class="mb-4 flex justify-between">
        <h1 class="text-3xl pl-2">Previous Brews</h1>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full gap-4">
        {#each finishedBrews as brew, id} 
        <Dialog.Root>
                <Dialog.Trigger class="focus:outline-none">
                    <Card.Root class="text-left w-full h-44 overflow-auto focus:outline-none">
                        <Card.Header>
                            <Card.Title>{brew.drink}</Card.Title>
                            <Card.Description>{brew.task}</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <p>{brew.notes.at(-1)}</p>
                        </Card.Content>
                    </Card.Root>
                </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>{brew.task}</Dialog.Title>
                <Dialog.Description>
                    {brew.drink}
                </Dialog.Description>
                <div class="flex justify-between">
                    <p>Step {brew.progress} out of {brew.steps.length}</p>

                    <div class="flex justify-center gap-3">
                        <Button disabled={brew.progress <= 1} on:click={() => finishedBrews[id].progress--} variant="outline">&#10094;</Button>
                        <Button on:click={() => {
                            finishedBrews[id].progress++
                            }} variant={brew.progress === brew.steps.length ? "default" : "outline"}>&#10095;</Button>
                    </div>
                </div>
                <div class="text-left">
                    {#if brew.progress === 1}
                    <p>{brew.steps[brew.progress-1]}</p>
                    <p class="opacity-55">{brew.steps[brew.progress]}</p>
                    <p class="opacity-55">...</p>
                    <p class="h-12"></p>
                    {:else if brew.progress === 2}
                    <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                    <p>{brew.steps[brew.progress-1]}</p>
                    <p class="opacity-55">{brew.steps[brew.progress]}</p>
                    <p class="opacity-55">...</p>
                    <p class="h-6"></p>
                    {:else if brew.progress === brew.steps.length - 1}
                    <p class="opacity-55">...</p>
                    <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                    <p>{brew.steps[brew.progress-1]}</p>
                    <p class="opacity-55">{brew.steps[brew.progress]}</p>
                    <p class="h-6"></p>
                    {:else if brew.progress === brew.steps.length}
                    <p class="opacity-55">...</p>
                    <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                    <p>{brew.steps[brew.progress-1]}</p>
                    <p class="h-12"></p>
                    {:else}
                    <p class="opacity-55">...</p>
                    <p class="opacity-55">{brew.steps[brew.progress-2]}</p>
                    <p>{brew.steps[brew.progress-1]}</p>
                    <p class="opacity-55">{brew.steps[brew.progress]}</p>
                    <p class="opacity-55">...</p>
                    {/if}
                </div>

                <div class="flex gap-5">
                    <Input></Input>
                    <Button>Add Note</Button>
                </div>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
        {/each}
    </div>
</div>

