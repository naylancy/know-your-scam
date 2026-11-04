<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function index()
    {
        return view('calculator');
    }

    public function calculate(Request $request)
    {
        $angka1 = $request->angka1;
        $angka2 = $request->angka2;
        $operator = $request->operator;

        if ($operator == '+') {
            $hasil = $angka1 + $angka2;
        } elseif ($operator == '-') {
            $hasil = $angka1 - $angka2;
        } elseif ($operator == '*') {
            $hasil = $angka1 * $angka2;
        } elseif ($operator == '/') {
            if ($angka2 == 0) {
                $hasil = "Tidak bisa dibagi 0";
            } else {
                $hasil = $angka1 / $angka2;
            }
        }

        return view('calculator', compact('hasil'));
    }
}