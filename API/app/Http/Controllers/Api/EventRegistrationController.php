<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EventRegistrationController extends Controller
{
    public function index()
    {
        $registrasi = EventRegistration::all();
        return response()->json([
            'code' => 200,
            'message' => 'Sukses',
            'data' => $registrasi
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_peserta' => 'required|string|max:255',
            'nama_event' => 'required|string|max:255',
            'tanggal_event' => 'required|date',
            'nomor_pendaftaran' => 'required|string|unique:event_registrations,nomor_pendaftaran|max:255',
            'kategori' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Gagal',
                'errors' => $validator->errors()
            ], 400);
        }

        EventRegistration::create($request->all());

        return response()->json([
            'code' => 200,
            'message' => 'Sukses'
        ]);
    }
}
