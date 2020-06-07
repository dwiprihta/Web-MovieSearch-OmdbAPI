<?php

Require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();

$response = $client->request('GET', 'http://omdbapi.com',[
    'query'=>[
        'apikey' => 'dca61bcc',
        's' => 'transformers'
    ]
]);

$result = json_decode($response->getBody()->getContents(), true);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<?php foreach ($result['Search'] as $src) : ?>
<body>
        <ul>
            <li><?= $src['Title'];?></li>
            <li><?= $src['Year'];?></li>
            <li>
                <img src="<?= $src['Poster'];?>"
            </li>
        </ul>
<?php endforeach;?>
</body>
</html>