<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
 
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $transaction = DB::table('transactions')
        //     ->leftJoin('categories', 'categories.id', '=', 'transactions.category_id')
        //     ->get();
         $user = Auth::user();
        if($user->role === 'admin') {
            $transaction = Transaction::with('categories', 'users')->get();
            return $this->respondWithToken($transaction);
        }
        $transaction = Transaction::with('categories', 'users')
            ->where('created_by', '=', $user->id)
            ->get();
        return $this->respondWithToken($transaction);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) 
    {
        $credentials = request(['category_id','quantity', 'price', 'subtotal', 'created_by']);
        $credentials['status'] = "Process";
        $result = Transaction::create($credentials);
        return $this->respondWithToken($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction, $id)
    {
        $category = Transaction::find($id);
        return $this->respondWithToken($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = Transaction::find($id);
        $category->category_id = $request->category_id;
        $category->quantity = $request->quantity;
        $category->price = $request->price;
        $category->subtotal = $request->subtotal;
        $category->created_by = $request->created_by;
        $category->status = $request->status;
        $category->save();
        return $this->respondWithToken($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }

     protected function respondWithToken($data)
    {
        return response()->json([
            'message' => 'Success',
            'code' => 200,
            'data' => $data
        ]);
    }
}
