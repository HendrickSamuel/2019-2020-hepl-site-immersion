<?php
require_once("./../../../phpqrcode/qrlib.php");
QRcode::png($_GET["data"], false, QR_ECLEVEL_H, 2, 2);
