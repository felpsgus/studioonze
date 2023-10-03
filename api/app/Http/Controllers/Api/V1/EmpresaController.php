<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Empresa\SaveRequest;
use App\Http\Resources\EmpresaResource;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function showAll() {
		$empresas = Empresa::all();
		$empresas->each(function ($empresa) {
			$empresa->logo = $empresa->logo == null ? null : asset('storage/empresas/logos/' . $empresa->logo);
		});
		return EmpresaResource::collection($empresas);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function save(Request $request) {
		$request->validate([
			'nome' => 'required|string',
			'cnpj' => 'required|string',
			'email' => 'email',
			'telefone' => 'string',
			'logo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		]);

		$fileName = null;
		if ($request->hasFile('logo')) {
			if (!$request->file('logo')->isValid()) {
				return response()->json([
					'message' => 'Arquivo inválido!'
				], 401);
			}

			$fileName = time() . '.' . $request->file('logo')->getClientOriginalExtension();
			$request->file('logo')->storeAs('public/empresas/logos', $fileName);
		} else {
			$fileName = null;
		}

		if (Empresa::where('cnpj', $request['cnpj'])->first()) {
			return response()->json([
				'message' => 'Empresa já cadastrada!'
			], 401);
		}

		$empresa = array(
			'nome' => $request->input('nome'),
			'cnpj' => $request->input('cnpj'),
			'email' => $request->input('email'),
			'telefone' => $request->input('telefone'),
			'logo' => $fileName
		);
		$empresa = new Empresa($empresa);

		$empresa->save();

		return new EmpresaResource($empresa);
	}

	/**
	 * Display the specified resource.
	 */
	public function show($id) {
		$empresa = Empresa::where('id_empresa', $id)->first();
		return new EmpresaResource($empresa);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(SaveRequest $request, $id) {

		$empresa = Empresa::find($id);
		if (!$empresa) {
			return response()->json(['error' => 'Empresa não encontrada'], 404);
		}

		if($request->has('nome'))
			$empresa->nome = $request->input('nome');

		if($request->has('cnpj'))
			$empresa->cnpj = $request->input('cnpj');
		
		if($request->has('email'))
			$empresa->email = $request->input('email');

		if($request->has('telefone'))
			$empresa->telefone = $request->input('telefone');

		if ($request->hasFile('logo')) {
			if (!$request->file('logo')->isValid()) {
				return response()->json([
					'message' => 'Arquivo inválido!'
				], 401);
			}

			$fileName = time() . '.' . $request->file('logo')->getClientOriginalExtension();
			$request->file('logo')->storeAs('public/empresas/logos', $fileName);
			$empresa->logo = $fileName;
		}

		// Save the updated data
		$empresa->save();

		return response()->json($empresa);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy($id) {
		$empresa = Empresa::findOrFail($id);
		$empresa->delete();
		return new EmpresaResource($empresa);
	}
}
