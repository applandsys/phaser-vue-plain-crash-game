<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import PhaserGame from './game/PhaserGame.vue';

</script>

<template>
    <div class="container mt-5 ">
        <div class="row">
            <div class="col-md-6">
                <div class="left-panel">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Stats ...</h5>
                            <p class="card-text">No result to show.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12">
                        <div class="game-wrapper">
                            <PhaserGame />
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-12">
                         <div class="buttons d-flex">
                             <button type="button" class="btn btn-secondary mx-2">Stake Selector</button>
                             <button type="button" class="btn btn-secondary">Auto Bet</button>
                         </div>
                    </div>
                </div>
                <div class="mt-3 row">
                    <div class="col-md-12 mx-2">
                        <input type="number" class="form-control"  placeholder="Bet amount">
                    </div>
                </div>
                <div class="mt-3 row">
                    <div class="col-md-12 mx-2">
                        <div class="buttons d-flex justify-content-between gap-1">
                            <div class="button-wrapper w-100">
                                <button type="button" class="btn btn-secondary w-100">20</button>
                            </div>
                            <div class="button-wrapper w-100">
                                <button type="button" class="btn btn-secondary w-100">100</button>
                            </div>
                            <div class="button-wrapper w-100">
                                <button type="button" class="btn btn-secondary w-100">200</button>
                            </div>
                            <div class="button-wrapper w-100">
                                <button type="button" class="btn btn-secondary w-100">800</button>
                            </div>
                            <div class="button-wrapper w-100">
                                <button type="button" class="btn btn-secondary w-100">3000</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-1 row">
                    <div class="col-md-12 mx-2">
                        <div class="buttons d-flex justify-content-between gap-1">
                            <div class="button-wrapper w-50">
                                <button type="button" class="btn btn-secondary w-100">1000</button>
                            </div>
                            <div class="button-wrapper w-50">
                                <button type="button" class="btn btn-danger w-100">x</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
