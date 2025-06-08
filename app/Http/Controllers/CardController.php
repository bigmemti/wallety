<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Card::class);
        return Inertia::render('card/index', [
            'cards' => Auth::user()->cards,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Card::class);

        return Inertia::render('card/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardRequest $request)
    {
        Auth::user()->cards()->create($request->validated());

        return to_route('card.index')->with('success', 'Card created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        Gate::authorize('view', $card);

        return Inertia::render('card/show', [
            'card' => $card,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        Gate::authorize('update', $card);

        return Inertia::render('card/edit', [
            'card' => $card,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Card $card)
    {
        $card->update($request->validated());

        return to_route('card.index')->with('success', 'Card updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        Gate::authorize('delete', $card);

        $card->delete();

        return to_route('card.index')->with('success', 'Card deleted successfully');
    }
}
