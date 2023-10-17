<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    //
     public function __construct()
    {
         $this->middleware('auth:api');
    }

    public function getAll()
    {
       
        $categories = Category::get();
        return $this->respondWithToken($categories);
    }

    public function getById($id)
    {
        $category = Category::find($id);
        return $this->respondWithToken($category);
    }

     public function update(Request $request, $id)
    {
        $category = Category::find($id);
        // print_r($request->name);
        $category->name = $request->name;
        $category->description = $request->description;
        $category->image = $request->image;
        $category->status = $request->status == 1 ? 1 : 0;
        $category->price = $request->price;
        $category->save();
        return $this->respondWithToken($category);
    }
    
    public function create()
    {
        $credentials = request(['name','description', 'image', 'price', 'status']);
        $credentials['status'] = true;
        $result = Category::create($credentials);
        return $this->respondWithToken($result);
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
