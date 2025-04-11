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
    import { brewSchema } from "./brewSchema.js";
    import { messageSchema } from "./messageSchema.js"

    // BREWFORM
    let { data } = $props()
    let { brews, finishedBrews, brewForm, messageForm } = $state(data)

    const form = superForm(brewForm, {
        validators: zodClient(brewSchema),
    })
    const { form: formData, enhance } = form

    let stepsTextarea = $state("")
    $effect(() => {
        $formData.steps = stepsTextarea.split("\n")
    })
    
    // svelte-ignore state_referenced_locally
    let openStates = $state(brews.map(() => false))
    function finishBrew(id: number) {
        finishedBrews = [...finishedBrews, brews[id]]
        openStates[id] = false
        brews.splice(id, 1)
        openStates.splice(id, 1)
    }

    // CHATBOT/NEW BREW
    const messageSuperForm = superForm(messageForm, {
        validators: zodClient(messageSchema)
    })
    const { form: messageFormData, message: messageMessage, enhance: messageEnhance } = messageSuperForm

    let messages: Message[] = $state([
        {
            author: "assistant",
            text: "Hey! Brew something new?",
            timeSent: new Date(),
        }
    ])
    
    let openAddBrewDialog = $state(false)
    let chatContainer: HTMLDivElement
    async function handleSendMessage() {
        messages = [...messages, 
            {
                author: "user",
                text: $messageFormData.userMessage,
                timeSent: new Date(),
            },
        ]
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight
        }, 1)

        let reply = ""
        switch ($messageFormData.userMessage) {
            case "I want to run a half-marathon":
                reply = "Great! How many weeks do you have to prepare?"
                break
            case "12":
                reply = "Perfect! Here's a detailed 12-week plan:\n" +
                        "1. Week 1: 3 runs (3-5 miles each), 1 cross-train (45 min).\n" +
                        "2. Week 2: Increase long run to 6 miles.\n" +
                        "3. Week 3: Add interval training (8x400m).\n" +
                        "4. Week 4: Reduce mileage for recovery.\n" +
                        "5. Weeks 5-11: Gradually increase long runs, add tempo runs (3-5 miles at race pace).\n" +
                        "6. Week 12: Reduce mileage, focus on rest, no hard runs.\n" +
                        "7. Race Day: Run the half-marathon! \n Does this sound like a good brew?"
                break
            case "yes":
                reply = "Creating brew..."
                break
            default:
                reply = "There was an error :( Please try that again";
        }

        setTimeout(() => {
            messages = [...messages, 
                {
                    author: "assistant",
                    text: reply,
                    timeSent: new Date(),
                },
            ]
            
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight
            }, 1)
        }, 1000)

        if ($messageFormData.userMessage === "yes") {
            brews = [...brews, 
                {
                    task: "Half-Marathon Training Plan",
                    description: "Prepare for a half-marathon in 12 weeks.",
                    steps: [
                        "Week 1: 3 runs (3-5 miles each), 1 cross-train (45 min).",
                        "Week 2: Increase long run to 6 miles.",
                        "Week 3: Add interval training (8x400m).",
                        "Week 4: Reduce mileage for recovery.",
                        "Weeks 5-11: Gradually increase long runs, add tempo runs (3-5 miles at race pace).",
                        "Week 12: Reduce mileage, focus on rest, no hard runs.",
                        "Race Day: Run the half-marathon!",
                    ],
                    drink: "Mocha",
                    notes: [],
                    progress: 1,
                }
            ]

            setTimeout(() => {
                openAddBrewDialog = false
                messages = [
                    {
                        author: "assistant",
                        text: "Hey! Brew something new?",
                        timeSent: new Date(),
                    }
                ]
            }, 2000)
        } 
    }

    function formatMessage(text: string): string {
        return text.replace(/\n/g, '<br>');
    }


    function handleCreateNewBrew() {
        stepsTextarea = ""
        brews = [...brews, {
            task: $formData.task,
            description: $formData.description,
            steps: $formData.steps,
            drink: $formData.drink,
            notes: [],
            progress: 1,
        }]

        openAddBrewDialog = false
    }
</script>

<!-- USER CURRENTLY BREWING -->
<div class="flex flex-col justify-center mb-10 mt-6">
    <div class="mb-4 flex justify-between">
        <h1 class="text-3xl pl-2">Brewing...</h1>

<!-- NEW BREW -->
        <Dialog.Root bind:open={openAddBrewDialog}>
            <Dialog.Trigger>
                <Button>New Brew</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Add Task</Dialog.Title>
                </Dialog.Header>
                <Tabs.Root value="miko">
                    <Tabs.List class="mb-2">
                        <Tabs.Trigger value="miko">Mikko</Tabs.Trigger>
                        <Tabs.Trigger value="manual">Manual</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="miko">
            <!-- CHATBOX -->
                        <form method="post" action="?/sendMessage" onsubmit={handleSendMessage} use:messageEnhance>
                            <div bind:this={chatContainer} class="h-80 flex flex-col gap-4 overflow-auto mb-4">
                                {#each messages as message}
                                <div class="w-full mb-5 pr-5 flex {message.author === "assistant" ? "justify-start" : "justify-end"}">
                                    <div class="flex flex-col {message.author === "assistant" ? "items-start" : "items-end"}">
                                        <p>{@html formatMessage(message.text)}</p>
                                        <p class="text-xs italic text-gray-500">{message.timeSent.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</p>
                                    </div>
                                </div>
                                {/each}
                            </div>
                            <Input name="userMessage" bind:value={$messageFormData.userMessage} placeholder="Write a message to Miko" autocomplete="off"></Input>
                        </form>
                    </Tabs.Content>
                    <Tabs.Content value="manual">
            <!-- TODO: ADD MANUAL FORM -->
                        <div class="h-96 overflow-auto">
                            <form method="POST" action="?/sendNewTask" use:enhance onsubmit={handleCreateNewBrew}>
                                <Form.Field {form} name="drink" class="mb-4">
                                    <Form.Control let:attrs>
                                        <Form.Label>Drink</Form.Label>
                                        <Input {...attrs} bind:value={$formData.drink} autocomplete="off" />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>

                                <Form.Field {form} name="task">
                                    <Form.Control let:attrs>
                                        <Form.Label>Task</Form.Label>
                                        <Input {...attrs} bind:value={$formData.task} autocomplete="off" />
                                    </Form.Control>
                                    <Form.FieldErrors />
                                </Form.Field>
                            
                                <Form.Field {form} name="description">
                                    <Form.Control let:attrs>
                                        <Form.Label>Description</Form.Label>
                                        <Input {...attrs} bind:value={$formData.description} autocomplete="off" />
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
                                
                                <div class="flex justify-end">
                                    <Form.Button>Create Brew</Form.Button>
                                </div>
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
                <Tabs.Root value="steps">
                    <Tabs.List class="mb-6">
                      <Tabs.Trigger value="steps">Overview</Tabs.Trigger>
                      <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="steps">
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
                    </Tabs.Content>
                    <Tabs.Content value="notes">
                        <div class="flex flex-col gap-3 mb-4">
                            {#each brew.notes as note}
                            <p>{note}</p>
                            {/each}
                        </div>
                        <div class="flex gap-5">
                            <Input></Input>
                            <Button>Add Note</Button>
                        </div>
                    </Tabs.Content>
                  </Tabs.Root>
                <Dialog.Header>

                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
        {/each}
    </div>
</div>

<!-- BREW HISTORY -->
<div class="flex flex-col justify-center">
    <div class="mb-4 flex justify-between">
        <h1 class="text-3xl pl-2">Completed Brews</h1>
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

