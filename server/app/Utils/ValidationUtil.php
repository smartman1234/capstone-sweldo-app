<?php

namespace App\Utils;

class ValidationUtil
{
    public static function validateEmail(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter your email';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'Invalid email';
        }
        return null;
    }

    public static function validatePassword(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter a password';
        }
        if (strlen($value) < 8) {
            return 'Password must be 8 characters and above';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        return null;
    }
    
    public static function validateFirstName(string $value = null)
    {
        if (empty($value)) {
            return 'Please enter your first name';
        }
        if (strlen($value) > 255) {
            return 'Max 255 characters only';
        }
        if (preg_match("/[^A-Za-z]/", $value)) {
            return 'Only letters are allowed';
        }
        return null;


}
