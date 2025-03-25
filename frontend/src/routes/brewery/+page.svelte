<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    // BREWING
    // fetch brewing tasks
    // brews will contain task name, description, 
    // steps(ingredients), progress(brewing time),
    // drinks(flavor notes eg espresso for hyped goals)
    interface Brew {
        task: string
        description: string
        steps: string[]
        progress: number
        notes: string[]
        drink: string
    }

    let MOCKBREWS: Brew[] = $state([
        {
        task: "Half-Marathon Training Plan",
        description: "Prepare for a half-marathon in 12 weeks.",
        steps: [
            "Week 1: Build base mileage (3 runs, 1 cross-train)",
            "Week 2: Increase long run distance",
            "Week 3: Incorporate speed work (intervals)",
            "Week 4: Recovery week (reduced mileage)",
            "Week 5-11: Progressive long runs, speed work, and tempo runs",
            "Week 12: Taper week (reduce mileage, focus on rest)",
            "Race Day: Run the half-marathon!",
        ],
        progress: 3,
        notes: [],
        drink: "Mocha",
        },
        {
            task: "Brew It App - MVP Development",
            description: "Implement the core features for the Brew It MVP (Brew, Explore, Profile).",
            steps: [
                "Set up project environment (React/Vue/Angular, etc.)",
                "Design and implement the Brew page (AI chatbot, brewing display)",
                "Implement data storage (database or local storage)",
                "Develop the Explore page (community brew browsing, support)",
                "Create the Profile/Settings page (language, light/dark mode)",
                "Integrate AI API (Gemini or ElevenLabs)",
                "Test and debug all features",
                "Prepare for initial deployment",
            ],
            progress: 2,
            notes: [],
            drink: "Silver Moon Tea",
        },
        {
            task: "Master Homemade Sourdough Bread",
            description: "Learn to bake a delicious sourdough loaf from scratch.",
            steps: [
                "Prepare the starter (day 1)",
                "Feed the starter (days 2-3)",
                "Mix the dough",
                "Bulk fermentation (4-6 hours)",
                "Shape the loaf",
                "Proof the loaf (2-3 hours)",
                "Bake the bread",
                "Enjoy the fresh bread!",
            ],
            progress: 5,
            notes: [],
            drink: "Hot Chocolate",
        },
        {
            task: "Learn to Rollerblade Backwards",
            description: "Master the art of rollerblading backwards.",
            steps: [
                "Practice balancing on rollerblades.",
                "Learn the 'V-stance' for stability.",
                "Practice small backward pushes.",
                "Develop the 'scissor' motion for backward movement.",
                "Increase speed and control while skating backward.",
                "Practice backward turns and stops.",
                "Combine backward skating with forward skating.",
            ],
            progress: 4,
            notes: [
                "Balance was harder than expected at first.",
                "Scissor motion clicked after a few tries.",
                "Turning backwards is still a bit wobbly.",
                "Fell once, but got right back up!",
            ],
            drink: "Smoothie", // Represents the smooth, gliding motion
        },
        {
            task: "Play a Blues Solo on Trumpet",
            description: "Learn to improvise a 12-bar blues solo on the trumpet.",
            steps: [
                "Learn the 12-bar blues chord progression.",
                "Practice blues scales (major, minor, pentatonic).",
                "Learn basic blues licks and phrases.",
                "Practice improvising over the blues progression.",
                "Develop phrasing and articulation.",
                "Listen to and transcribe blues trumpet solos.",
                "Perform a blues solo with a backing track.",
            ],
            progress: 2,
            notes: [
                "Chord progression took a while to memorize.",
                "Improvising is challenging but fun.",
                "Transcribing solos helped with phrasing.",
                "Still need to improve my high notes.",
            ],
            drink: "Whiskey", // Represents the soulful, raw feel of blues music
        },
    ])

    let isOpen = $state(false)
    function finishBrew(id: number) {
        MOCKFINISHEDBREWS = [...MOCKFINISHEDBREWS, MOCKBREWS[id]]
        MOCKBREWS.splice(id, 1)
        isOpen = false
    }

    // CHATBOT/NEW BREW
    // chatbox ui, text input and chat display
    // sending to gemini, receiving ai response
    // edit task name, description, and steps
    // save and store in db

    // BREW HISTORY
    // same as previous brews but add section for
    // user reflection and takeaways
    let MOCKFINISHEDBREWS: Brew[] = $state([
        {
            task: "Sales Pitch Preparation",
            description: "Prepare and deliver a compelling sales pitch to a potential client.",
            steps: [
                "Research client's needs and pain points.",
                "Develop key talking points and value propositions.",
                "Create a visually appealing presentation.",
                "Practice delivery and anticipate potential questions.",
                "Deliver the sales pitch.",
                "Follow up with client.",
            ],
            progress: 6, // Completed
            drink: "Black Coffee",
            notes: [
                "Client responded positively to the data-driven approach.",
                "Need to improve closing statements for next pitch.",
                "Visuals were effective in conveying key information.",
                "Practice really helped with my confidence."
            ],
        },
        {
            task: "Windmill Dunk Training",
            description: "Learn to perform a windmill dunk in basketball.",
            steps: [
                "Improve vertical jump height.",
                "Practice catching the ball mid-air.",
                "Develop arm swing technique.",
                "Combine jump and arm swing.",
                "Practice dunking on a lowered hoop.",
                "Attempt windmill dunk on a regulation hoop.",
                "Perfect the technique.",
            ],
            progress: 7, // Completed
            drink: "Redbull",
            notes: [
                "Achieved a 36-inch vertical jump!",
                "Arm swing timing is crucial.",
                "Lowered hoop practice was essential.",
                "First successful windmill dunk was exhilarating!",
                "Still need to improve consistency."
            ],
        },
        {
            task: "Chopin's Black Key Etude",
            description: "Learn to play Chopin's Etude Op. 10, No. 5 (Black Key Etude).",
            steps: [
                "Learn the right-hand melody.",
                "Practice the left-hand accompaniment.",
                "Combine both hands at a slow tempo.",
                "Gradually increase tempo.",
                "Focus on dynamics and phrasing.",
                "Memorize the piece.",
                "Perform the etude.",
            ],
            progress: 7, // Completed
            drink: "Chrysanthenum Tea",
            notes: [
                "Right-hand scales were challenging but rewarding.",
                "Left-hand arpeggios required consistent practice.",
                "Achieved a smooth and flowing performance.",
                "Dynamics added depth to the piece.",
                "Memorization took longer than expected.",
                "Recording of my final performance is available.",
            ],
        },
    ])

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
                <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
                <Dialog.Description>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </Dialog.Description>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full gap-4">
        {#each MOCKBREWS as brew, id} 
        <Dialog.Root bind:open={isOpen}>
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
                        <Button disabled={brew.progress <= 1} on:click={() => MOCKBREWS[id].progress--} variant="outline">&#10094;</Button>
                        <Button on:click={() => {
                            if (brew.progress === brew.steps.length) {
                                finishBrew(id)
                            } else {
                                MOCKBREWS[id].progress++
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
        {#each MOCKFINISHEDBREWS as brew} 
        <Dialog.Root>
                <Dialog.Trigger>
                    <Card.Root class="text-left w-full h-44 overflow-auto">
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
                    <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
                    <Dialog.Description>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                    </Dialog.Description>
                </Dialog.Header>
            </Dialog.Content>
        </Dialog.Root>
        {/each}
    </div>
</div>

