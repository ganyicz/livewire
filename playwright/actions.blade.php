<?php

new class extends \Livewire\Component
{
    public $output = '';

    public function setOutputToFoo()
    {
        $this->output = 'foo';
    }

    public function setOutputTo(...$params)
    {
        $this->output = implode('', $params);
    }

    public function appendToOutput(...$params)
    {
        $this->output .= implode('', $params);
    }

    public function pause()
    {
        usleep(1000 * 150);
    }

    public function throwError()
    {
        usleep(1000 * 150);
        throw new \Exception;
    }
} ?>

<main>
    <button type="button" wire:click="setOutputToFoo" id="foo">Foo</button>
    <button type="button" wire:click="setOutputTo('bar', 'bell')" id="bar">Bar</button>
    <button type="button" wire:click="setOutputTo('a', &quot;b&quot; , 'c','d' ,'e', ''.concat('f'))" id="ball">Ball</button>
    <button type="button" wire:click="setOutputToFoo()" id="bowl">Bowl</button>
    <button type="button" wire:click="@if (1) setOutputToFoo() @else setOutputToFoo() @endif" id="baw">Baw</button>
    <button type="button" wire:click="
        setOutputTo(
            'fizz',
            'fuzz'
        )" id="fizzfuzz">Fizz Fuzz</button>
    <button type="button" wire:click="setOutputTo('baz')" id="baz.outer"><button type="button" wire:click="$refresh" id="baz.inner">Inner</button> Outer</button>
    <input type="text" wire:blur="appendToOutput('bop')" id="bop.input"><button type="button" wire:mousedown="appendToOutput('bop')" id="bop.button">Blur &</button>
    <input type="text" wire:keydown="appendToOutput('bob')" wire:keydown.enter="appendToOutput('bob')" id="bob">
    <input type="text" wire:keydown.enter="setOutputTo('lob')" id="lob">
    <input type="text" wire:keydown.shift.enter="setOutputTo('law')" id="law">
    <input type="text" wire:keydown.space="setOutputTo('spa')" id="spa">
    <form wire:submit="pause">
        <div wire:ignore>
            <input type="text" id="blog.input.ignored">
        </div>

        <input type="text" id="blog.input">
        <button type="submit" id="blog.button">Submit</button>
    </form>
    <form wire:submit="throwError">
        <button type="submit" id="boo.button">Submit</button>
    </form>
    <input wire:keydown.debounce.75ms="setOutputTo('bap')" id="bap"></button>
    <span id="output">{{ $output }}</span>
</main>
